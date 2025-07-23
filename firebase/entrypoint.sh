#!/bin/sh

firebase emulators:start &
EMULATOR_PID=$!

echo "Waiting for Auth Emulator..."
until curl -s http://localhost:9099/identitytoolkit.googleapis.com/v1/projects/$FIREBASE_PROJECT_ID/config > /dev/null; do
  sleep 1
done
echo "Auth Emulator is started!"

echo "Creating test user"
curl -X POST http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake-api-key \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@mail.com",
    "password": "123456",
    "returnSecureToken": true
  }' > /dev/null
echo "Test user created!"

wait $EMULATOR_PID

