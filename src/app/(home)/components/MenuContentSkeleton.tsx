export default function MenuContentSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-4 md:gap-6 lg:gap-8">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="group flex mx-auto flex-col gap-4 max-w-[300px] w-full"
          >
            <div className="relative w-full aspect-square bg-gray-100 rounded-tl-[25%] rounded-tr-[12%] rounded-b-[25%] overflow-hidden animate-pulse"></div>

            <div className="flex flex-col gap-3 px-2">
              <div className="h-6 bg-gray-200 rounded-full animate-pulse w-4/5 mx-auto"></div>
              <div className="h-5 bg-gray-200 rounded-full animate-pulse w-3/5 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded-full animate-pulse w-2/3 mx-auto"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
