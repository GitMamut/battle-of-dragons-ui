import React from "react";

interface SmallMessagesProps {
  messages: string[];
  capitilizeFirst: boolean;
}

const SmallMessages: React.FC<SmallMessagesProps> = ({
  messages,
  capitilizeFirst,
}) => {
  return (
    <>
      {messages.map((message, index) => (
        <p
          key={index}
          className={
            "small-message" + (capitilizeFirst && index === 0 ? " first" : "")
          }
        >
          {message}
        </p>
      ))}
    </>
  );
};

export default SmallMessages;
