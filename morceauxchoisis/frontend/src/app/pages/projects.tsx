"use client";

import { gql, useQuery } from "@apollo/client";
import { Project } from "../../types/project";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Image = dynamic(() => import("next/image"));

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

// Loading component
const LoadingCard = () => (
  <div className='rounded-lg border p-4 animate-pulse'>
    <div className='h-[300px] bg-gray-200 rounded'></div>
    <div className='h-6 bg-gray-200 rounded mt-4'></div>
    <div className='h-4 bg-gray-200 rounded mt-2'></div>
  </div>
);

export default function ProjectList() {
  const { loading, error, data } = useQuery<{ projects: Project[] }>(
    GET_PROJECTS
  );

  if (loading) {
    return (
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {[1, 2, 3].map((n) => (
          <LoadingCard key={n} />
        ))}
      </div>
    );
  }
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {data?.projects.map((project: Project) => (
        <div key={project.id} className='rounded-lg border p-4'>
          <Suspense fallback={<LoadingCard />}>
            <Image
              src={project.imageUrl}
              alt={project.name}
              width={500}
              height={300}
              // className='object-cover'
              className='object-cover rounded'
              priority={false}
            />
          </Suspense>

          <h2 className='text-xl font-bold'>{project.name}</h2>
          <p>{project.description}</p>
          <div>Status: {project.status}</div>
        </div>
      ))}
    </div>
  );
}
