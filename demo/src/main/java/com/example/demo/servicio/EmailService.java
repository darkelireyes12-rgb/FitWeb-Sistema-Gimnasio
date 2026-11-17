
package com.example.demo.servicio;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void enviarToken(String destino, String token) {
        SimpleMailMessage mensaje = new SimpleMailMessage();
        mensaje.setTo(destino);
        mensaje.setSubject("FitWeb - Recuperación de Contraseña");
        mensaje.setText("Hola,\n\nTu código de recuperación es: " + token
                + "\n\nSi no lo solicitaste, ignora este mensaje."
                + "\n\nAtentamente,\nEl equipo de FitWeb.");
        mailSender.send(mensaje);
    }
}