import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      githubLink,
      previousInvestments,
      fundingNeeded,
      equityToDilute,
      creatorId,
      imageUrl,
    } = body;

    if (!title || !description || !githubLink || !creatorId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const projectsCollection = db.collection('projects');

    // Create new project document
    const projectData = {
      title,
      description,
      githubLink,
      previousInvestments: parseFloat(previousInvestments),
      fundingNeeded: parseFloat(fundingNeeded),
      equityToDilute: parseFloat(equityToDilute),
      creatorId,
      imageUrl,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      totalFunding: 0,
      investors: [],
    };

    const result = await projectsCollection.insertOne(projectData);
    console.log('Project saved to MongoDB:', result);

    return NextResponse.json({
      message: 'Project created successfully',
      projectId: result.insertedId,
    });
  } catch (error) {
    console.error('Error saving project to MongoDB:', error);
    return NextResponse.json(
      { error: 'Failed to save project data' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const creatorId = searchParams.get('creatorId');
    const status = searchParams.get('status');

    const { db } = await connectToDatabase();
    const projectsCollection = db.collection('projects');

    // Build query based on parameters
    const query: any = {};
    if (creatorId) {
      query.creatorId = creatorId;
    }
    if (status) {
      query.status = status;
    }

    const projects = await projectsCollection.find(query).toArray();

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects from MongoDB:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
} 