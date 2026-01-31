export interface World {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  duration: string;
  creator: string;
  description: string;
  process: ProcessStep[];
  style?: 'liminalChromatic' | 'monoClassic';
  playerUrl?: string; // In a real implementation, this would be an embedded Unreal Engine player
}

export interface ProcessStep {
  title: string;
  description: string;
  image?: string;
  timestamp: string;
}

export const worlds: World[] = [
  {
    id: 'liminal-spaces',
    title: 'Liminal Spaces',
    subtitle: 'An exploration of the in-between',
    thumbnail: 'https://images.unsplash.com/photo-1520529890308-f503006340b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2NzcwMTQ2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '3-5 min',
    creator: 'Alex Chen',
    description: 'A series of interconnected transitional spaces that feel both familiar and unsettling. Navigate through empty hallways, parking garages, and stairwells that exist outside of time.',
    style: 'liminalChromatic',
    process: [
      {
        title: 'Initial Concept',
        description: 'Started with the idea of spaces we pass through but never inhabit. The feeling of being somewhere between destinations.',
        timestamp: 'Week 1',
      },
      {
        title: 'Level Blockout',
        description: 'Created basic geometry focusing on scale and proportions. Used modular pieces to establish the flow between spaces.',
        timestamp: 'Week 2',
      },
      {
        title: 'Lighting Study',
        description: 'Experimented with fluorescent lighting and volumetric fog. The goal was to create that uncanny feeling of artificial light in empty spaces.',
        image: 'https://images.unsplash.com/photo-1566103867526-08b0ca2aefcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJyZWFsJTIwZHJlYW1zY2FwZXxlbnwxfHx8fDE3Njc3MTgxMzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        timestamp: 'Week 3',
      },
      {
        title: 'Sound Design',
        description: 'Added ambient hums, distant echoes, and the subtle sound of ventilation systems. Sound became crucial in building the atmosphere.',
        timestamp: 'Week 4',
      },
      {
        title: 'Polish & Optimization',
        description: 'Refined materials, adjusted post-processing, and optimized for smooth performance. Kept it minimal to maintain the eerie emptiness.',
        timestamp: 'Week 5',
      },
    ],
  },
  {
    id: 'chromatic-void',
    title: 'Chromatic Void',
    subtitle: 'A journey through color and absence',
    thumbnail: 'https://images.unsplash.com/photo-1561737271-954105a4bda1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGVudmlyb25tZW50fGVufDF8fHx8MTc2NzcxODEzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '4-6 min',
    creator: 'Maya Rodriguez',
    description: 'An abstract environment where color itself becomes the architecture. Float through shifting planes of pure hue that respond to your movement.',
    style: 'monoClassic',
    process: [
      {
        title: 'Color Theory Research',
        description: 'Studied how colors interact in 3D space. Wanted to explore the emotional impact of navigating through pure color.',
        timestamp: 'Week 1',
      },
      {
        title: 'Procedural Geometry',
        description: 'Built a system to generate floating geometric planes that shift and rearrange based on player position.',
        timestamp: 'Week 2-3',
      },
      {
        title: 'Movement Mechanics',
        description: 'Designed a floating movement system. Players drift rather than walk, emphasizing the dreamlike quality.',
        timestamp: 'Week 4',
      },
      {
        title: 'Interactive Color',
        description: 'Implemented a system where colors shift and blend as you pass through them. Each visit creates a unique experience.',
        image: 'https://images.unsplash.com/photo-1561737271-954105a4bda1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGVudmlyb25tZW50fGVufDF8fHx8MTc2NzcxODEzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
        timestamp: 'Week 5',
      },
      {
        title: 'Audio Reactivity',
        description: 'Added generative music that responds to color transitions. The experience became audiovisual.',
        timestamp: 'Week 6',
      },
    ],
  },
  {
    id: 'forgotten-arcade',
    title: 'Forgotten Arcade',
    subtitle: 'Memory and nostalgia rendered',
    thumbnail: 'https://images.unsplash.com/photo-1611343387852-8d84d5ad07d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhlcmVhbCUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3Njc3MTgxMzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '5-7 min',
    creator: 'Jordan Kim',
    description: 'Step into a photorealistic recreation of a 1990s arcade that never existed. Every detail is perfect, yet something feels off.',
    style: 'monoClassic',
    process: [
      {
        title: 'Memory as Source',
        description: 'Combined memories from multiple arcades to create a "composite memory" - a place that feels real but never was.',
        timestamp: 'Week 1',
      },
      {
        title: 'Photo Scanning',
        description: 'Scanned and photographed real arcade machines, carpet patterns, and signage from the era. Built a library of authentic materials.',
        image: 'https://images.unsplash.com/photo-1611343387852-8d84d5ad07d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhlcmVhbCUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3Njc3MTgxMzh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        timestamp: 'Week 2-3',
      },
      {
        title: 'The Uncanny Detail',
        description: 'Modeled every machine, coin slot, and joystick. But intentionally made some elements slightly wrong - wrong colors, wrong logos.',
        timestamp: 'Week 4-5',
      },
      {
        title: 'Temporal Glitches',
        description: 'Added subtle time distortions. Screens flicker with impossible games. Reflections show different times of day.',
        timestamp: 'Week 6',
      },
      {
        title: 'The Empty Hour',
        description: 'Set the lighting to capture that specific time - late afternoon when arcades were always eerily empty.',
        timestamp: 'Week 7',
      },
    ],
  },
  {
    id: 'vertical-garden',
    title: 'Vertical Garden',
    subtitle: 'Nature reclaims the impossible',
    thumbnail: 'https://images.unsplash.com/photo-1566103867526-08b0ca2aefcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJyZWFsJTIwZHJlYW1zY2FwZXxlbnwxfHx8fDE3Njc3MTgxMzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '3-4 min',
    creator: 'Sam Torres',
    description: 'Climb through an impossible vertical structure where nature has overtaken brutalist architecture. Gravity shifts as you ascend.',
    style: 'monoClassic',
    process: [
      {
        title: 'Sketching the Impossible',
        description: 'Started with Escher-like drawings of spaces that defy physics. How can gravity change without the player noticing?',
        timestamp: 'Week 1',
      },
      {
        title: 'Foliage Systems',
        description: 'Created procedural plant growth that follows impossible geometries. Vines that grow upside down, trees that ignore gravity.',
        timestamp: 'Week 2-3',
      },
      {
        title: 'Camera Tricks',
        description: 'The key was smooth camera rotation transitions. As you climb, your perspective shifts gradually until up becomes down.',
        timestamp: 'Week 4',
      },
      {
        title: 'Wind & Movement',
        description: 'Added dynamic wind simulation that helps sell the perspective shifts. Everything sways, creating constant motion.',
        timestamp: 'Week 5',
      },
    ],
  },
];
