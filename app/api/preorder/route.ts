import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, product, color, size, quantity, totalPrice } = body;

    // Validate the data
    if (!email || !product || !size) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Option 1: Save to a file (temporary solution)
    // You can view this data in your project folder
    const fs = require('fs');
    const path = require('path');
    const preordersPath = path.join(process.cwd(), 'preorders.json');
    
    let preorders = [];
    if (fs.existsSync(preordersPath)) {
      const data = fs.readFileSync(preordersPath, 'utf8');
      preorders = JSON.parse(data);
    }
    
    const newPreorder = {
      id: Date.now(),
      email,
      product,
      color,
      size,
      quantity,
      totalPrice,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    
    preorders.push(newPreorder);
    fs.writeFileSync(preordersPath, JSON.stringify(preorders, null, 2));

    // Option 2: Send email notification to yourself
    // Uncomment and configure if you want email notifications
    /*
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Pre-Order: ${product}`,
      html: `
        <h2>New Pre-Order Received</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Color:</strong> ${color}</p>
        <p><strong>Size:</strong> ${size}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Total:</strong> $${totalPrice}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `
    });
    */

    // Option 3: Add to newsletter service (Mailchimp example)
    // Uncomment and configure with your Mailchimp API key
    /*
    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
    const MAILCHIMP_SERVER = process.env.MAILCHIMP_SERVER; // e.g., 'us1'

    const response = await fetch(
      `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: '',
            PREORDER: `${product} - ${color} - ${size}`,
          },
          tags: ['pre-order']
        }),
      }
    );
    */

    return NextResponse.json({ 
      success: true, 
      message: 'Pre-order received successfully',
      orderId: newPreorder.id
    });

  } catch (error) {
    console.error('Pre-order error:', error);
    return NextResponse.json(
      { error: 'Failed to process pre-order' },
      { status: 500 }
    );
  }
}