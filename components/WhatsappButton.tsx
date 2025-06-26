import React from "react"

const whatsappNumber = "971525775382"
const whatsappLink = `https://wa.me/${whatsappNumber}`

export default function WhatsappButton() {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل عبر واتساب"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#25D366",
        color: "white",
        borderRadius: "50%",
        width: "56px",
        height: "56px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
        cursor: "pointer",
        transition: "transform 0.18s, box-shadow 0.18s, background 0.18s",
      }}
      className="whatsapp-fab"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="white"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <path d="M16 3C9.373 3 4 8.373 4 15c0 2.647.86 5.1 2.33 7.09L4 29l7.18-2.28A12.93 12.93 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22.917c-2.13 0-4.19-.62-5.93-1.79l-.42-.26-4.27 1.36 1.4-4.15-.27-.43A10.93 10.93 0 0 1 5 15c0-6.065 4.935-11 11-11s11 4.935 11 11-4.935 11-11 11zm6.07-8.13c-.33-.17-1.95-.96-2.25-1.07-.3-.11-.52-.17-.74.17-.22.33-.85 1.07-1.04 1.29-.19.22-.38.25-.71.08-.33-.17-1.39-.51-2.65-1.62-.98-.87-1.64-1.94-1.83-2.27-.19-.33-.02-.5.15-.66.16-.16.33-.38.5-.57.17-.19.22-.33.33-.55.11-.22.06-.41-.03-.58-.09-.17-.74-1.78-1.01-2.44-.27-.66-.54-.57-.74-.58-.19-.01-.41-.01-.63-.01-.22 0-.58.08-.88.41-.3.33-1.15 1.12-1.15 2.73 0 1.61 1.18 3.17 1.35 3.39.17.22 2.32 3.55 5.63 4.84.79.34 1.41.54 1.89.69.79.25 1.51.22 2.08.13.64-.1 1.95-.8 2.23-1.57.28-.77.28-1.43.2-1.57-.08-.14-.3-.22-.63-.39z" />
      </svg>
      <style>{`
        .whatsapp-fab:hover {
          transform: scale(1.12);
          box-shadow: 0 4px 22px rgba(18,140,126,0.25);
          background: #1ebe5d;
        }
      `}</style>
    </a>
  )
} 