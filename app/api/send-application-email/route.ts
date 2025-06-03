// // app/api/send-application-email/route.ts
// import { NextResponse } from "next/server";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req: Request) {
//   const { to, jobName, companyName } = await req.json();

//   try {
//     const data = await resend.emails.send({
//       from: "noreply@yourdomain.com", // Replace with your verified domain email
//       to,
//       subject: `Application Received for ${jobName}`,
//       html: `
//         <p>Hi,</p>
//         <p>Thank you for applying to <strong>${companyName}</strong> for the position of <strong>${jobName}</strong>.</p>
//         <p>We will let you know soon.</p>
//         <p>Regards,<br/>${companyName} Team</p>
//       `,
//     });

//     return NextResponse.json({ success: true, data });
//   } catch (error: any) {
//     console.error("Resend Error:", error);
//     return NextResponse.json({ success: false, error: error.message });
//   }
// }
