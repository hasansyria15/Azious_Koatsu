"""
Custom Email Backend pour contourner les problèmes de certificat SSL sur Windows
"""
import ssl
import smtplib
from django.core.mail.backends.smtp import EmailBackend


class CustomEmailBackend(EmailBackend):
    """
    Backend email personnalisé qui désactive la vérification SSL stricte.
    Utilisé pour contourner les problèmes de certificat sur Windows.
    """

    def open(self):
        if self.connection:
            return False

        try:
            # Créer un contexte SSL qui ne vérifie pas les certificats
            context = ssl.create_default_context()
            context.check_hostname = False
            context.verify_mode = ssl.CERT_NONE

            if self.use_ssl:
                self.connection = smtplib.SMTP_SSL(
                    self.host,
                    self.port,
                    timeout=self.timeout,
                    context=context
                )
            else:
                self.connection = smtplib.SMTP(
                    self.host,
                    self.port,
                    timeout=self.timeout
                )
                if self.use_tls:
                    self.connection.starttls(context=context)

            if self.username and self.password:
                self.connection.login(self.username, self.password)

            return True
        except Exception:
            if not self.fail_silently:
                raise
            return False
