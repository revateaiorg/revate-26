
export default function SectionHeading({
  label,
  title,
  accent,
  description,
  dark = false,
  align = "left",
}) {
  return (
    <header
      className={`section-heading ${
        dark ? "section-heading-dark" : ""
      } ${align === "center" ? "section-heading-center" : ""}`}
    >
      <p className="section-eyebrow">
        <span aria-hidden="true" />
        {label}
      </p>

      <h2>
        {title}
        {accent && (
          <>
            <br />
            <span style={{ color: "#3B82F6" }}>{accent}</span>
          </>
        )}
      </h2>

      {description && (
        <p className="section-description">{description}</p>
      )}
    </header>
  );
}