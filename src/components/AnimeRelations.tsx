import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Entry = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type AnimeEntry = {
  relation: string;
  entry: Entry[];
};

type AnimeEntriesProps = {
  data: AnimeEntry[];
};

const AnimeEntries: React.FC<AnimeEntriesProps> = ({ data }) => {
  const [entries, setEntries] = useState<AnimeEntry[]>([]);

  useEffect(() => {
    const fetchEntryDetails = () => {
      setEntries(data);
    };

    fetchEntryDetails();
  });

  if (entries.length === 0) {
    return <div>No relations.</div>;
  }

  return (
    <div>
      <table className='border-collapse w-full'>
        <thead>
          <tr>
            <th className='p-2 border'>Relation</th>
            <th className='p-2 border'>Name</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(({ relation, entry }) => (
            <React.Fragment key={relation}>
              <tr>
                <td className='p-2 border' rowSpan={entry.length}>
                  {relation}
                </td>
                <td className='p-2 border'>
                  {entry[0].type === 'anime' ? (
                    <Link
                      to={`/anime/${entry[0].mal_id}`}
                      className='text-blue-600 hover:underline'
                    >
                      {entry[0].name}
                    </Link>
                  ) : (
                    <span>{entry[0].name}</span>
                  )}
                </td>
              </tr>
              {entry.slice(1).map(({ mal_id, name }) => (
                <tr key={mal_id}>
                  <td className='p-2 border'>{name}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnimeEntries;
