import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface InterviewEmailProps {
  candidateName: string;
  position: string;
  interviewDate: string;
  interviewTime: string;
  companyName?: string;
  interviewFormat: string;
}

export const InterviewNotification = ({
  candidateName,
  position,
  interviewDate,
  interviewTime,
  companyName = "Interviewly",
  interviewFormat,
}: InterviewEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        Your Interview Has Been Scheduled - Please Login to Interviewly
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Text style={styles.title}>Interview Scheduled</Text>
          </Section>

          <Section style={styles.content}>
            <Text style={styles.logo}>📅</Text>

            <Text style={styles.greeting}>Hello, {candidateName}</Text>

            <Text style={styles.message}>
              Great news! Your interview for the {position} role at A2Z
              Solutions has been scheduled. Please review the details below and
              ensure you're available at the scheduled time.
            </Text>

            <Section style={styles.detailsContainer}>
              <Text style={styles.detailsTitle}>Interview Details:</Text>
              <Text style={styles.detailItem}>
                <strong>Date:</strong> {interviewDate}
              </Text>
              <Text style={styles.detailItem}>
                <strong>Time:</strong> {interviewTime}
              </Text>
              <Text style={styles.detailItem}>
                <strong>Format:</strong> {interviewFormat}
              </Text>
              <Text style={styles.detailItem}>
                <strong>Duration:</strong> 45 minutes
              </Text>
            </Section>

            <Section style={styles.securityAlert}>
              <Text style={styles.securityText}>
                For security purposes, please log in to your Interviewly
                dashboard at least 15 minutes before your scheduled interview
                time.
              </Text>
            </Section>

            <Button
              href="https://app.interviewly.com/login"
              style={styles.button}
            >
              Login to Interviewly Dashboard
            </Button>

            <Text style={styles.cautionText}>
              Use your existing credentials to securely access your interview
              portal. If you have trouble logging in, please contact
              support@interviewly.com.
            </Text>

            <Text style={styles.message}>
              If you need to reschedule or have any questions, please respond to
              this email or contact our recruitment team directly.
            </Text>

            <Section style={styles.footer}>
              <Text style={styles.signatureText}>Best regards,</Text>
              <Text style={styles.signatureName}>The Recruitment Team</Text>
              <Text style={styles.companyName}>{companyName}</Text>
              <Text style={styles.footerText}>
                © 2025 {companyName}. All rights reserved.
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default InterviewNotification;

const styles = {
  body: {
    backgroundColor: "#f7f8fa",
    fontFamily: "'Inter', Arial, sans-serif",
    padding: "20px",
    margin: 0,
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.08)",
    maxWidth: "520px",
    margin: "auto",
    border: "1px solid #e4e7eb",
  },
  header: {
    backgroundColor: "#5046e5",
    padding: "20px",
    borderRadius: "12px 12px 0 0",
    textAlign: "center" as const,
  },
  title: {
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "bold" as const,
    margin: 0,
  },
  content: {
    padding: "30px",
    textAlign: "left" as const,
  },
  logo: {
    fontSize: "48px",
    textAlign: "center" as const,
    marginBottom: "25px",
  },
  greeting: {
    fontSize: "22px",
    fontWeight: "600" as const,
    color: "#1a1a2c",
    marginBottom: "15px",
  },
  message: {
    fontSize: "16px",
    color: "#4a4a68",
    lineHeight: "1.6",
    marginBottom: "25px",
  },
  detailsContainer: {
    backgroundColor: "#f5f7ff",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "25px",
    border: "1px solid #e0e4fd",
  },
  detailsTitle: {
    fontSize: "18px",
    fontWeight: "bold" as const,
    color: "#5046e5",
    marginBottom: "15px",
  },
  detailItem: {
    fontSize: "16px",
    color: "#4a4a68",
    marginBottom: "10px",
    lineHeight: "1.4",
  },
  securityAlert: {
    backgroundColor: "#fffbea",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "25px",
    border: "1px solid #ffeeba",
  },
  securityText: {
    fontSize: "15px",
    color: "#856404",
    margin: 0,
  },
  button: {
    backgroundColor: "#5046e5",
    color: "#ffffff",
    padding: "14px 24px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "600" as const,
    display: "block",
    textAlign: "center" as const,
    marginBottom: "20px",
  },
  cautionText: {
    fontSize: "14px",
    color: "#8f90a6",
    marginBottom: "25px",
    textAlign: "center" as const,
  },
  footer: {
    borderTop: "1px solid #e4e7eb",
    paddingTop: "20px",
    marginTop: "15px",
  },
  signatureText: {
    fontSize: "16px",
    color: "#4a4a68",
    margin: "5px 0",
  },
  signatureName: {
    fontSize: "16px",
    fontWeight: "600" as const,
    color: "#1a1a2c",
    margin: "5px 0",
  },
  companyName: {
    fontSize: "14px",
    color: "#5046e5",
    margin: "5px 0 15px 0",
  },
  footerText: {
    fontSize: "12px",
    color: "#8f90a6",
    margin: "10px 0",
  },
};
