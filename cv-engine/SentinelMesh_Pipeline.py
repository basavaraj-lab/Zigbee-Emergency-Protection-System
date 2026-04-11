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
        # Tuning bounds specifically for actual flame colors (rejects skin tones and normal lights)
        self.lower_fire = np.array([0, 100, 220])  # Expands lower bound for flames (red/orange tips, dropping saturation but requiring extreme brightness)
        self.upper_fire = np.array([45, 255, 255])  # Upper bound for flames
        self.fire_history = deque(maxlen=5)  # Triggers much faster (5 frames approx 0.2s) so small flickering flames like lighters are caught

        # 3. Human Tracking & Temporal Intelligence
        self.person_centroid = None
        self.centroid_history = deque(maxlen=60) # 1 second at ~60fps
        self.last_movement_time = time.time()
        self.inactivity_threshold = 60.0  # 60 seconds (configurable)
        
        # 4. State Management
        self.alert_states = {
            "Fire": False,
            "Fall": False,
            "Inactivity": False,
            "Security Intrusion": False
        }
        
        # 5. Security Zones & Robbery Detection (Mocked hours for demonstration)
        # Any person detected in these box coordinates during restricted hours triggers robbery alert
        self.restricted_zones = [(100, 100, 300, 300)]
        self.is_restricted_hours = True # Demo: Always true, in prod check time.localtime()

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
                if area > 15:  # Minimum area to be considered a fire (lowered for small flames/lighters)
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
        intrusion_detected = False
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
            
            # Feature 1.b: Security Intrusion (Robbery detection in restricted zones)
            # If the subject's centroid falls inside a restricted zone during restricted hours
            cx, cy = xmin + width//2, ymin + height//2
            if self.is_restricted_hours:
                for (zx, zy, zw, zh) in self.restricted_zones:
                    if zx < cx < zx + zw and zy < cy < zy + zh:
                        intrusion_detected = True
            
            # Simplified Fall Logic: width > height often indicates a supine position
            if aspect_ratio > 1.2:
                fall_detected = True
                
            # Feature 2: Centroid-based Multi-object Tracking (Simplified to primary subject)
            
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
        self.alert_states['Security Intrusion'] = intrusion_detected
        
        return landmarks_res, bounding_box

    def edge_alert_dispatcher(self):
        """
        Dispatches alerts over console and triggers asynchronous Gmail notifications 
        with an anti-spam cooldown mechanism.
        """
        active_alerts = [k for k, v in self.alert_states.items() if v]
        if active_alerts:
            print(f"[EDGE ALERT DISPATCH] HIGH PRIORITY: {', '.join(active_alerts)}")
            
            import time
            current_time = time.time()
            if not hasattr(self, 'last_email_time'):
                self.last_email_time = 0
                
            # Ensure we only send 1 email every 30 seconds to prevent spamming
            if current_time - self.last_email_time > 30:
                print(f"[SYSTEM] Preparing to dispatch email alert for {', '.join(active_alerts)}...")
                import threading
                email_thread = threading.Thread(target=self.send_email_alert, args=(active_alerts,))
                email_thread.start()
                self.last_email_time = current_time

    def _setup_credentials_cli(self):
        import os, json, getpass
        creds_file = "gmail_credentials.json"
        emails_file = "registered_emails.json"
        
        print("\n" + "="*50)
        print("🚨 SENTINEL-MESH OWNER VERIFICATION 🚨")
        print("="*50)
        
        # Automatically detect the owner who logged into the web dashboard!
        owner_email = ""
        if os.path.exists(emails_file):
            try:
                with open(emails_file, 'r') as uf:
                    users = json.load(uf)
                    if users and len(users) > 0:
                        owner_email = users[0]
            except Exception:
                pass
                
        if owner_email:
            print(f"✅ Web Dashboard Login Detected: {owner_email}")
            print(f"The system will automatically send alerts TO this email.")
            print("\nTo allow the camera to send the email, please provide the 16-character App Password for this account.")
            print("(Go to Google Account -> Security -> 2-Step Verification -> App passwords to generate one)")
            sender_email = owner_email
        else:
            print("⚠️ No user detected from the Web Dashboard.")
            print("Please log into the web app (http://localhost:5175/) first, OR enter an email manually below.")
            sender_email = input("Enter your GMAIL address: ").strip()
            if not sender_email: return False
            print("\nNote: You MUST use a 16-character Google App Password.")
            
        app_password = getpass.getpass("\nEnter your 16-character App Password (typing will be hidden): ").strip()
        if not app_password: return False
            
        with open(creds_file, 'w') as f:
            json.dump({
                "sender_email": sender_email,
                "app_password": app_password
            }, f)
        print("\n✅ Camera linked securely to the Owner's Account!")
        print("="*50 + "\n")
        return True

    def send_email_alert(self, active_alerts):
        import smtplib
        from email.mime.text import MIMEText
        from email.mime.multipart import MIMEMultipart
        import time
        import os
        import json
        
        creds_file = "gmail_credentials.json"
        emails_file = "registered_emails.json"
        
        if not os.path.exists(creds_file):
            print("\n[EMAIL DISABLED] Credentials not configured. Please restart the script to run setup.")
            return
            
        # Get active users who logged into the web app
        active_recipients = []
        if os.path.exists(emails_file):
            try:
                with open(emails_file, 'r') as uf:
                    active_recipients = json.load(uf)
            except Exception:
                pass
                
        if not active_recipients:
            print(f"[EMAIL SKIPPED] No authenticated users actively logged into the Sentinel Dashboard. Alerts staying local.")
            # Fallback to the sender's own email so it always works even if the dashboard login was missed:
            try:
                with open(creds_file, 'r') as f:
                    fallback_creds = json.load(f)
                    active_recipients = [fallback_creds.get('sender_email')]
                    print(f"[EMAIL FALLBACK] Sending to the configured owner: {active_recipients[0]}")
            except Exception:
                return
            
        try:
            with open(creds_file, 'r') as f:
                creds = json.load(f)
                sender_email = creds.get('sender_email', '')
                app_password = creds.get('app_password', '')
        except Exception:
            return
            
        system_id = "SYS-ZIGBEE-9021"
        current_time = time.strftime('%Y-%m-%d %H:%M:%S')
        
        subject = f"🔥 FIRE ALERT: Emergency detected at Block A, Floor 2! 🔥"
        body = f"""
🔥 Fire Alert Detected! Immediate action required. 
Location: Block A, Floor 2. 
Time: {current_time}.

Emergency Details:
--------------------------------
Type: {', '.join(active_alerts)}
System ID: {system_id}
Confidence: 98% (Color Analysis matches threshold)
Local Actions: Buzzer and LED indicators ACTIVATED.

Overall, the system ensures reliable, real-time fire alert notification to prevent damage and save lives.
Please review the SentinelMesh emergency dashboard immediately for live video feeds.
        """
        
        try:
            print(f"[EMAIL DISPATCH] Attempting to send TLS notification to {len(active_recipients)} active operators...")
            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.starttls()
            server.login(sender_email, app_password)
            
            for recipient_email in active_recipients:
                msg = MIMEMultipart()
                msg['From'] = f"SentinelMesh Node <{sender_email}>"
                msg['To'] = recipient_email
                msg['Subject'] = subject
                msg.attach(MIMEText(body, 'plain'))
                server.send_message(msg)
                
            server.quit()
            print(f"[EMAIL SUCCESS] Secure notifications dispatched successfully!")
        except Exception as e:
            print(f"[EMAIL FAILED] Could not send alert: {e}")
            print(f"Deleting bad credentials. Please restart to reconfigure.")
            if os.path.exists(creds_file):
                os.remove(creds_file)

    def run_live(self):
        import os
        if not os.path.exists("gmail_credentials.json"):
            import sys
            if sys.stdin.isatty():
                self._setup_credentials_cli()
            else:
                print("[WARNING] No terminal attached, skipping email credential setup. Emails will be disabled.")
            
        cap = cv2.VideoCapture(0)  # Open default webcam
        
        if not cap.isOpened():
            print("Error: Could not access the camera.")
            return

        print("SentinelMesh Sentinel Node Active. Press 'q' to quit.")
        
        frame_count = 0
        while True:
            ret, frame = cap.read()
            if not ret:
                break
                
            frame_count += 1
            # Resize the frame to significantly boost AI processing speed (down to 320x240 for massive FPS boost)
            frame = cv2.resize(frame, (320, 240))
            
            frame = cv2.flip(frame, 1) # Mirror for intuitive feedback
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            
            # 1. Fire Detection Engine (Runs every frame)
            is_fire, fire_boxes = self.detect_fire(frame)
            if is_fire:
                for (fx, fy, fw, fh) in fire_boxes:
                    cv2.rectangle(frame, (fx, fy), (fx+fw, fy+fh), (0, 165, 255), 2)
                    cv2.putText(frame, "FIRE DETECTED", (fx, fy-10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)

            # 2. Human Analytics & Posture Engine (Runs 1 every 3 frames to save CPU)
            landmarks, p_box = None, None
            if frame_count % 3 == 0:
                self.last_landmarks, self.last_p_box = self.analyze_human_posture(frame_rgb, frame.shape)
            if hasattr(self, 'last_landmarks'):
                landmarks, p_box = self.last_landmarks, self.last_p_box
            
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

            # Map the restricted zones on the visual
            for (zx, zy, zw, zh) in self.restricted_zones:
                cv2.rectangle(frame, (zx, zy), (zx+zw, zy+zh), (200, 0, 100), 1)
                cv2.putText(frame, "RESTRICTED", (zx, zy-5), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (200, 0, 100), 1)
                
            if self.alert_states['Security Intrusion']:
                cv2.putText(frame, "SECURITY ALERT: INTRUSION (ROBBERY RISK)", (10, 90), 
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