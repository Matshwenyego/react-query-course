import { Link } from "react-router-dom";
import { GoIssueClosed, GoIssueOpened, GoComment } from 'react-icons/go';
import { relativeDate } from '../helpers/relativeDate';
import { useUserData } from '../helpers/useUserData';

export const IssueItem = ({
  title, 
  number, 
  assignee, 
  commentsCount, 
  createdBy, 
  createdDate, 
  status, 
  labels
}) => {
  const assigned = useUserData(assignee);
  const author = useUserData(createdBy);
  return (
    <li>
      <div>
        {status === 'done' || status === 'cancelled' ? (
          <GoIssueClosed style={{ color: 'red' }} />
        ) : (
          <GoIssueOpened style={{ color: 'green' }} />
        )}
      </div>
      <div class="issue-content">
        <span>
          <Link to={`/issue/${number}`}>{title}</Link>
          {labels.map(label => (
            <span key={label} className={`label red`}>{label}</span>
          ))}
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)} {!author.isLoading && author.data && `by ${author.data.name}`}
        </small>
      </div>
      {assignee && !assigned.isLoading && assigned ? (<img src={assigned.data.profilePictureUrl} className="assigned-to" alt={`Assigned to ${assigned.data.name} avatar`} />) : (null)}
      <span className="comment-count">
        {commentsCount > 0 ? (
          <span><GoComment />{commentsCount}</span>
        ) : null}
      </span>
    </li>
  );
};
