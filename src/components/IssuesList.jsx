import { useQuery } from 'react-query';
import { IssueItem } from './IssueItem';

export default function IssuesList() {
  const { isLoading, isError, data, error } = useQuery(['issues'], async () => {
    const res = await fetch('/api/issues');
    return res.json();
  });

if (isError) {
  return (
    <div>
      <p>{error.message}</p>
    </div>
  )
}

  return (
    <div>
      <h2>Issues List</h2>
      {isLoading ? (
        <p>Loading...</p>
      ): (
        <ul className="issues-list">
        {data.map(issue => 
          <IssueItem 
            key={issue.id} 
            title={issue.title} 
            number={issue.number} 
            assignee={issue.assignee}
            commentsCount={issue.comments.length}
            createdBy={issue.createdBy}
            createdDate={issue.createdDate}
            status={issue.status}
            labels={issue.labels}
          />
        )}

      </ul>
      )}

    </div>
  );
}
