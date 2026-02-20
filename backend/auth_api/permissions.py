from rest_framework.permissions import BasePermission
from .jwt_utils import decode_token


class IsAdminAuthenticated(BasePermission):
    """Check for valid JWT token in Authorization header."""

    def has_permission(self, request, view):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return False
        token = auth_header.split(" ", 1)[1]
        payload = decode_token(token)
        return payload is not None
