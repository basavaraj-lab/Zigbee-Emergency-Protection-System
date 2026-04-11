import cv2
import numpy as np
import mediapipe as mp
import time
from collections import deque

class SentinelMeshPipeline:
    def __init__(self):
        # 1. Initialize MediaPipe for Human Analytics & Posture Detection
        import mediapipe as mp
        from mediapipe.tasks import python
        from mediapipe.tasks.python import vision
        import os
        
        model_path = 'models/pose_landmarker.task'
        with open(model_path, 'rb') as f:
            model_asset_buffer = f.read()
        
        base_options = python.BaseOptions(model_asset_buffer=model_asset_buffer)
        options = vision.PoseLandmarkerOptions(
            base_options=base_options,
            output_segmentation_masks=False)
        self.detector = vision.PoseLandmarker.create_from_options(options)

        # 2. Fire Detection Config (HSV Color-space)
        # Tuning bounds for realistic flame colors
        self.lower_fire = np.array([15, 100, 200])  # Lower bound for Orange/Yellow
        self.upper_fire = np.array([35, 255, 255])  # Upper bound
        self.fire_history = deque(maxlen=30)  # Temporal flicker pattern analysis (30 frames)

        # 3. Human Tracking & Temporal Intelligence
        self.person_centroid = None
        self.centroid_history = deque(maxlen=60) # 1 second at ~60fps
        self.last_movement_time = time.time()
        self.inactivity_threshold = 60.0  # 60 seconds (configurable)
        
        # 4. State Management
        self.alert_states = {
            "Fire": False,
            "Fall": False,
            "Inactivity": False
        }

    def detect_fire(self, frame):
        """
        Layered fire-detection pipeline: HSV color-space segmentation, 
        contour dynamics, and temporal persistence check.
        """
        blurred = cv2.GaussianBlur(frame, (21, 21), 0)
        hsv = cv2.cvtColor(blurred, cv2.COLOR_BGR2HSV)
        
        mask = cv2.inRange(hsv, self.lower_fire, self.upper_fire)
        
        # Morphological operations to remove noise
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
        mask = cv2.erode(mask, kernel, iterations=1)
        mask = cv2.dilate(mask, kernel, iterations=2)

        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        fire_detected = False
        fire_boxes = []

        if contours:
            for contour in contours:
                area = cv2.contourArea(contour)
                if area > 200:  # Minimum area to be considered a fire
                    x, y, w, h = cv2.boundingRect(contour)
                    fire_boxes.append((x, y, w, h))
                    fire_detected = True

        # Temporal validation: reduce reflections/lighting noise
        self.fire_history.append(float(fire_detected))
        fire_confidence = sum(self.fire_history) / len(self.fire_history) if len(self.fire_history) > 0 else 0
        
        # If fire detected in > 50% of recent frames, confirm alert
        is_real_fire = fire_confidence > 0.5
        self.alert_states['Fire'] = is_real_fire
        
        return is_real_fire, fire_boxes

    def analyze_human_posture(self, frame_rgb, frame_shape):
        """
        Human Analytics, Posture Assessment, Fall Detection, and Temporal Inactivity.
        """
        import mediapipe as mp
        # Convert the frame to MediaPipe Image format
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=frame_rgb)
        results = self.detector.detect(mp_image)
        h, w, _ = frame_shape
        
        fall_detected = False
        inactivity_detected = False
        bounding_box = None
        landmarks_res = None
        
        if results.pose_landmarks and len(results.pose_landmarks) > 0:
            landmarks = results.pose_landmarks[0]
            landmarks_res = landmarks
            
            # Formulate bounding box based on key skeletal keypoints to calculate Aspect Ratio
            x_coords = [lm.x for lm in landmarks]
            y_coords = [lm.y for lm in landmarks]
            
            xmin, xmax = int(min(x_coords) * w), int(max(x_coords) * w)
            ymin, ymax = int(min(y_coords) * h), int(max(y_coords) * h)
            
            bounding_box = (xmin, ymin, xmax - xmin, ymax - ymin)
            
            # Feature 1: Posture & Fall Detection via Aspect Ratio
            width = xmax - xmin
            height = ymax - ymin
            aspect_ratio = width / height if height > 0 else 0
            
            # Simplified Fall Logic: width > height often indicates a supine position
            if aspect_ratio > 1.2:
                fall_detected = True
                
            # Feature 2: Centroid-based Multi-object Tracking (Simplified to primary subject)
            cx, cy = xmin + width//2, ymin + height//2
            
            if self.person_centroid is not None:
                # Calculate centroid displacement (Movement tracking)
                displacement = np.sqrt((cx - self.person_centroid[0])**2 + (cy - self.person_centroid[1])**2)
                
                # Temporal Intelligence Watchdog
                if displacement > 15.0: # 15 pixels movement threshold
                    self.last_movement_time = time.time() # Reset inactivity timer
            else:
                self.last_movement_time = time.time()
                
            self.person_centroid = (cx, cy)
            self.centroid_history.append((cx, cy))
            
            # Check Inactivity (Unresponsiveness Watchdog)
            inactive_duration = time.time() - self.last_movement_time
            if inactive_duration > self.inactivity_threshold:
                inactivity_detected = True
                
        else:
            self.person_centroid = None # Lost tracking
            
        self.alert_states['Fall'] = fall_detected
        self.alert_states['Inactivity'] = inactivity_detected
        
        return landmarks_res, bounding_box

    def edge_alert_dispatcher(self):
        """
        Simulates dispatching alerts over MQTT/WebSockets with sub-second latency.
        """
        # In a real system, this would publish to a topic.
        active_alerts = [k for k, v in self.alert_states.items() if v]
        if active_alerts:
            print(f"[EDGE ALERT DISPATCH] HIGH PRIORITY: {', '.join(active_alerts)}")

    def run_live(self):
        cap = cv2.VideoCapture(0)  # Open default webcam
        
        if not cap.isOpened():
            print("Error: Could not access the camera.")
            return

        print("SentinelMesh Sentinel Node Active. Press 'q' to quit.")
        
        while True:
            ret, frame = cap.read()
            if not ret:
                break
                
            frame = cv2.flip(frame, 1) # Mirror for intuitive feedback
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            
            # 1. Fire Detection Engine
            is_fire, fire_boxes = self.detect_fire(frame)
            if is_fire:
                for (fx, fy, fw, fh) in fire_boxes:
                    cv2.rectangle(frame, (fx, fy), (fx+fw, fy+fh), (0, 165, 255), 2)
                    cv2.putText(frame, "FIRE DETECTED", (fx, fy-10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)

            # 2. Human Analytics & Posture Engine
            landmarks, p_box = self.analyze_human_posture(frame_rgb, frame.shape)
            
            if landmarks:
                # Custom draw logic because we don't have mp_drawing available
                for lm in landmarks:
                    x, y = int(lm.x * frame.shape[1]), int(lm.y * frame.shape[0])
                    cv2.circle(frame, (x, y), 3, (255, 0, 0), -1)
                
                if p_box:
                    px, py, pw, ph = p_box
                    color = (0, 255, 0) # Green if safe
                    
                    if self.alert_states['Fall']:
                        color = (0, 0, 255) # Red if Fallen
                        cv2.putText(frame, "FALL DETECTED!", (px, py - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)
                        
                    cv2.rectangle(frame, (px, py), (px+pw, py+ph), color, 2)

            # 3. Temporal Intelligence Overlay
            inactive_time = time.time() - self.last_movement_time if self.person_centroid else 0
            cv2.putText(frame, f"Inactive Time: {inactive_time:.1f}s / {self.inactivity_threshold}s", 
                        (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
            
            if self.alert_states['Inactivity']:
                cv2.putText(frame, "CRITICAL: UNRESPONSIVE SUBJECT", (10, 60), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 3)

            # 4. Dispatch Alerts
            self.edge_alert_dispatcher()

            # Render
            cv2.imshow("SentinelMesh Edge AI Pipeline", frame)
            
            # Exit clause
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()

if __name__ == "__main__":
    pipeline = SentinelMeshPipeline()
    # Change threshold to 5 seconds for rapid testing purposes, in production this should be 60
    pipeline.inactivity_threshold = 10.0 
    pipeline.run_live()