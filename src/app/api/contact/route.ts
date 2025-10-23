import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Inizializza SendGrid
console.log('🔧 Inizializzando SendGrid con API Key:', process.env.SENDGRID_API_KEY?.substring(0, 10) + '...');
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    console.log('📨 Richiesta POST ricevuta');
    
    // 1. Parse del corpo della richiesta
    const body: ContactFormData = await request.json();
    console.log('📦 Dati ricevuti:', body);

    // 2. Validazione dei dati
    if (!body.firstName || !body.lastName || !body.email || !body.message) {
      console.log('❌ Campi mancanti');
      return NextResponse.json(
        { error: 'Tutti i campi sono obbligatori' },
        { status: 400 }
      );
    }

    // 3. Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      console.log('❌ Email non valida:', body.email);
      return NextResponse.json(
        { error: 'Email non valida' },
        { status: 400 }
      );
    }

    console.log('✅ Validazione passata');

    // 4. Crea il contenuto dell'email DA INVIARE A TE
    const emailContent = `
      <h2>Nuovo Messaggio di Contatto</h2>
      <p><strong>Nome:</strong> ${body.firstName} ${body.lastName}</p>
      <p><strong>Email:</strong> <a href="mailto:${body.email}">${body.email}</a></p>
      <p><strong>Messaggio:</strong></p>
      <p>${body.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p style="color: #666; font-size: 12px;">
        Inviato da: ${new Date().toLocaleString('it-IT')}
      </p>
    `;

    console.log('📧 Invio email a:', process.env.NEXT_PUBLIC_CONTACT_EMAIL);

    // 5. Invia l'email AL TUO INDIRIZZO
    await sgMail.send({
      to: process.env.NEXT_PUBLIC_CONTACT_EMAIL!,
      from: 'noreply@likhastudio3d.com',
      replyTo: body.email,
      subject: `Nuovo Contatto - ${body.firstName} ${body.lastName}`,
      html: emailContent,
    });

    console.log('✅ Email a te inviata con successo');

    // 6. Invia email di CONFERMA al cliente
    const confirmationEmail = `
      <h2>Grazie per il contatto! 🎉</h2>
      <p>Ciao ${body.firstName},</p>
      <p>Ho ricevuto il tuo messaggio e ti contatterò al più presto.</p>
      <p><strong>Il tuo messaggio:</strong></p>
      <blockquote style="background: #f5f5f5; padding: 10px; border-left: 3px solid #007a9c; margin: 10px 0;">
        ${body.message.replace(/\n/g, '<br>')}
      </blockquote>
      <hr>
      <p style="color: #666; font-size: 12px;">
        Likha Studio 3D | info@likhastudio3d.com
      </p>
    `;

    await sgMail.send({
      to: body.email,
      from: 'noreply@likhastudio3d.com',
      subject: 'Conferma - Ho ricevuto il tuo messaggio',
      html: confirmationEmail,
    });

    console.log('✅ Email di conferma al cliente inviata');

    // 7. Risposta al frontend
    return NextResponse.json(
      { 
        success: true, 
        message: 'Email inviata con successo!' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ ERRORE nell\'invio email:', error);
    
    return NextResponse.json(
      { error: 'Errore nell\'invio dell\'email. Riprova più tardi.' },
      { status: 500 }
    );
  }
}