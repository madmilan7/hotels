import LinkButton from "@/app/components/link-button";
import PageTitle from "@/app/components/page-title";

function HotelsPage() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Hotels" />
        <LinkButton title="Add Hotel" path="/admin/hotels/add" />
      </div>
    </div>
  );
}

export default HotelsPage;
