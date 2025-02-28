import React from 'react'

const BlockedUser = () => {
  return (
    <div className="container">
      <div className="message">
        <p>
          We regret to inform you that your access to our website has been blocked.
        </p>
        <p>
          If you need any assistance or believe this is an error, please contact our support team at <span className="email">support@youngengineers.org</span>.
        </p>
        <p>
          We’re here to help and will be happy to assist you.
        </p>
      </div>
      <style jsx>{`
        .container {
          position: fixed;
          inset: 0;
          background: url(/images/whitebg.jpeg) no-repeat center center fixed;
          background-size: cover;
          margin: 0;
          padding: 0;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .message {
          text-align: center;
          max-width: 600px;
          padding: 2rem;
          background-color: rgba(255, 255, 255, 0.9);
          border: 2px solid #D32F2F;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .message p {
          font-weight: bold;
          margin-bottom: 1rem;
          color: #000000;
        }
        .message p:first-child {
          font-size: 1.75rem;
        }
        .message p:nth-child(2),
        .message p:nth-child(3) {
          font-size: 1.5rem;
        }
        .email {
          text-decoration: underline;
          color: #000000;
        }
        @media (max-width: 480px) {
          .message {
            max-width: 90%;
            padding: 1.5rem;
          }
          .message p:first-child {
            font-size: 1.5rem;
          }
          .message p:nth-child(2),
          .message p:nth-child(3) {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  )
}

export default BlockedUser
