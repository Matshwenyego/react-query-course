import { Link } from "react-router-dom";
import { GoIssueClosed, GoIssueOpened, GoComment } from 'react-icons/go';
import { relativeDate } from '../helpers/relativeDate';

export const IssueItem = ({
  title, number, assignee, commentsCount, createdBy, createdDate, status, labels
}) => {
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
        <small>#{number} opened {relativeDate(createdDate)} by {createdBy}</small>
      </div>
      {assignee ? (<div>{assignee}</div>) : (null)}
      <span className="comment-count">
        {commentsCount > 0 ? (
          <span><GoComment />{commentsCount}</span>
        ) : null}
      </span>
    </li>
  );
};
