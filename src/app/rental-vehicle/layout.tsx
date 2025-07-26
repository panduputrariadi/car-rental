type Props = {
  children: React.ReactNode;
};
const layout = async (props: Props) => {
  return (
    <div className="w-full">
        {props.children}
    </div>
  );
};

export default layout;