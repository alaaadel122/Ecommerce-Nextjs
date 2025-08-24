import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar,faStarHalfAlt} from '@fortawesome/free-solid-svg-icons'
type RatingProps = {
  value: number;   // قيمة التقييم (ممكن تبقى 3 أو 4.5 مثلاً)
  max?: number;    // أقصى عدد نجوم (default = 5)
};
export default function Rating({  value, max = 5 }:RatingProps) {
  return (
    <div className="flex pt-5">
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;   // قيمة النجمة الحالية (من 1 لـ max)

        if (value >= starValue) {
          // لو التقييم أكبر أو يساوي قيمة النجمة → خليها كاملة
          return <FontAwesomeIcon icon={faStar} key={i} className="text-yellow-400" />;
        } else if (value >= starValue - 0.5) {
          // لو التقييم نص (زي 3.5) → خليها نص نجمة
          return <FontAwesomeIcon icon={faStarHalfAlt} key={i} className="text-yellow-400" />;
        } else {
          // غير كدا → خليها نجمة فاضية
          return <FontAwesomeIcon icon={faStar} key={i} className="text-yellow-400" />;
        }
      })}
    </div>
  );
}
