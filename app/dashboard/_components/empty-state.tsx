import { Snowflake } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="w-full flex justify-center items-center mt-16">
      <div className="text-center">
        <Snowflake className="h-10 w-10 mx-auto text-orange-600 mb-6" />
        <h1 className="text-4xl font-bold mb-4">No Data Found</h1>
        <p className="text-gray-600">
          It seems that there is no data available at the moment. Try to upload
          new files.
        </p>
      </div>
    </div>
  );
}
