'use client';

import { gql, useQuery } from '@apollo/client';
import { Project } from '@/types/project';
import Image from 'next/image';

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      description
      imageUrl
      projectUrl
      status
      createdAt
    }
  }
`;

export default function ProjectList() {
  const { loading, error, data } = useQuery<{ projects: Project[] }>(
    GET_PROJECTS
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data?.projects.map((project: Project) => (
        <div key={project.id} className="rounded-lg border p-4">
          <Image
            src={project.imageUrl}
            alt={project.name}
            width={500}
            height={300}
            className="object-cover"
          />
          <h2 className="text-xl font-bold">{project.name}</h2>
          <p>{project.description}</p>
          <div>Status: {project.status}</div>
        </div>
      ))}
    </div>
  );
}
