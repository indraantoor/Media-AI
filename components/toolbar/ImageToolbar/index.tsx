import BgRemove from '../BgRemove';
import BgReplace from '../BgReplace';
import ExtractPart from '../ExtractPart';
import GenerativeFill from '../GenerativeFill';
import GenRemove from '../GenRemove';

export default function ImageTools() {
  return (
    <div className="flex w-full flex-col gap-4">
      <GenRemove />
      <BgRemove />
      <BgReplace />
      <GenerativeFill />
      <ExtractPart />
    </div>
  );
}
