export default function CompareCard({ title, description, image, to }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg text-center flex flex-col items-center">
      <div className="w-full overflow-hidden rounded-2xl mb-4">
        <img src={image} alt={title} className="rounded-2xl w-full h-auto" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <a
        href={`${to}#top`}
        className="bg-brand text-white px-6 py-2 rounded-full font-semibold hover:bg-brand/90 transition"
      >
        Start Work
      </a>
    </div>
  );
}


