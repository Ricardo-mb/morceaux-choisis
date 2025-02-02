"use client";

import { gql, useQuery } from "@apollo/client";
import { Project } from "@/types/project";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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

const ProjectCard = ({ project }: { project: Project }) => (
  <Card className='glass-card overflow-hidden'>
    <CardHeader className='space-y-2'>
      <div className='space-y-1'>
        <span className='inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium'>
          {project.status}
        </span>
        <CardTitle className='text-2xl font-semibold tracking-tight'>
          {project.name}
        </CardTitle>
      </div>
    </CardHeader>
    <CardContent className='space-y-4'>
      <div className='relative aspect-video overflow-hidden rounded-lg'>
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            className='object-cover transition-transform duration-300 hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        ) : (
          <div className='flex h-full items-center justify-center bg-muted'>
            <p className='text-sm text-muted-foreground'>No image</p>
          </div>
        )}

      </div>
      <CardDescription className='text-base leading-relaxed'>
        {project.description}
      </CardDescription>
    </CardContent>
    <CardFooter className='flex items-center justify-between border-t bg-secondary/10 px-6 py-4'>
      <time className='text-sm text-muted-foreground'>
        {new Date(project.createdAt).toLocaleDateString("fr-FR", {
          month: "long",
          year: "numeric",
        })}
      </time>
      <a
        href={project.projectUrl}
        className='inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80'
      >
        View Project
        <svg
          className='ml-1 h-4 w-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 5l7 7-7 7'
          />
        </svg>
      </a>
    </CardFooter>
  </Card>
);

const LoadingSkeleton = () => (
  <div className='space-y-4'>
    <Skeleton className='h-8 w-3/4' />
    <Skeleton className='aspect-video w-full rounded-lg' />
    <Skeleton className='h-4 w-full' />
    <Skeleton className='h-4 w-2/3' />
  </div>
);

export default function Page() {
  const { loading, error, data } = useQuery<{ projects: Project[] }>(
    GET_PROJECTS
  );

  return (
    <div className='min-h-screen bg-gradient-to-b from-background to-secondary/20'>
      <section className='relative overflow-hidden py-20'>
        <div className='absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10' />
        <div className='container relative mx-auto px-4'>
          <div className='fade-in space-y-4'>
            <h1 className='text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
              "Morceaux Choisis"
            </h1>
            <p className='mx-auto max-w-2xl text-center text-lg text-muted-foreground sm:text-xl'>
              {/* Discover our portfolio of innovative solutions and creative
              endeavors. Each project represents our commitment to excellence
              and forward-thinking design. */}
            </p>
          </div>
        </div>
      </section>

      <section className='container mx-auto px-4 py-16 sm:px-6 lg:px-8'>
        {loading ? (
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {[...Array(6)].map((_, i) => (
              <Card key={i} className='glass-card'>
                <CardContent className='p-6'>
                  <LoadingSkeleton />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Alert variant='destructive' className='mx-auto max-w-2xl'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        ) : (
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {data?.projects.map((project: Project) => (
              <div key={project.id} className='fade-in'>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
