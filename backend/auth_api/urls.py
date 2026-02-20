from django.urls import path
from .views import LoginView, VerifyTokenView

urlpatterns = [
    path("login/", LoginView.as_view(), name="auth-login"),
    path("verify/", VerifyTokenView.as_view(), name="auth-verify"),
]
