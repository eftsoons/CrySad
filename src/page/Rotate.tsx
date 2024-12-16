import { Spinner } from "@telegram-apps/telegram-ui";

export function Rotate() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner size="l" />
    </div>
  );
}
