export default function SidebarOption(props) {
  const { title, icon } = props;
  return (
    <div
      className="flex items-center sm:justify-start justify-center gap-2 sm:pr-6 pr-3 pl-3 py-3 rounded hover:bg-white/10 font-medium"
      {...props}>
      <div>{icon}</div>
      <div className="sidebar_option_title max-w-20 whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </div>
  );
}
