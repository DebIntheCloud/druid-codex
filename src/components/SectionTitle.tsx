type Props = {
  children: React.ReactNode;
};

export default function SectionTitle({ children }: Props) {
  return <h2 className="sectionTitle">{children}</h2>;
}
