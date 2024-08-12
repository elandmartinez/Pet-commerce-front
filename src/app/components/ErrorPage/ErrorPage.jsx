export default function ({statusCode}) {
  return (
    <div className="w-full h-full pt-[350px]">
      <h1 className="max-w-[400px] text-[40px] font-bold text-secondaryColor mx-auto">An Error ocurred while loading the page: {statusCode}</h1>
    </div>
  )
}