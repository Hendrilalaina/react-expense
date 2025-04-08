import CurrencyUtils from "../../utils/CurrencyUtils";
import DateUtils from "../../utils/DateUtils";

interface Props {
  user: string;
  total: number
}

const DashboardStatus = ({user, total}: Props) => {
  return <div className="mt-2">
    <div className="text-center">
      <h6 className="mb-2">Total Expenses</h6>
      <h3>
        <span className="badge rounded-pill app-primary-bg-color">
          {CurrencyUtils.formatToMG(total)}
        </span>
      </h3>
    </div>
    <div className="d-flex justify-content-between">
      <div>
        Tongasoa, <b className="app-primary-color">{user}</b>
      </div>
      <div>
        {DateUtils.getFormattedDate(new Date())}
      </div>
    </div>
  </div>
}

export default DashboardStatus;