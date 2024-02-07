export function ErrorText(props) {
  return (
    <div className={`text-red-500 font-medium text-sm mt-1`}>
      {props.children}
    </div>
  );
}
