import BgRemove from '../BgRemove';
import GenRemove from '../GenRemove';

export default function ImageTools() {
  return (
    <div className="flex w-full flex-col gap-4">
      <GenRemove />
      <BgRemove />
    </div>
  );
}
