import hashlib
import hmac
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .jwt_utils import generate_token, decode_token

# Hardcoded admin credentials
ADMIN_USERNAME = "sorooshx"
ADMIN_PASSWORD_HASH = hashlib.sha256("sorooshx".encode()).hexdigest()


class LoginView(APIView):
    """Authenticate with hardcoded credentials and return JWT token."""

    def post(self, request):
        username = request.data.get("username", "").strip()
        password = request.data.get("password", "")

        password_hash = hashlib.sha256(password.encode()).hexdigest()

        if username == ADMIN_USERNAME and hmac.compare_digest(password_hash, ADMIN_PASSWORD_HASH):
            token = generate_token(username)
            return Response({
                "token": token,
                "username": username,
                "message": "Login successful",
            })

        return Response(
            {"error": "Invalid username or password"},
            status=status.HTTP_401_UNAUTHORIZED,
        )


class VerifyTokenView(APIView):
    """Verify if a JWT token is still valid."""

    def post(self, request):
        token = request.data.get("token", "")
        if not token:
            auth_header = request.headers.get("Authorization", "")
            if auth_header.startswith("Bearer "):
                token = auth_header.split(" ", 1)[1]

        payload = decode_token(token)
        if payload:
            return Response({"valid": True, "username": payload.get("username")})
        return Response({"valid": False}, status=status.HTTP_401_UNAUTHORIZED)
