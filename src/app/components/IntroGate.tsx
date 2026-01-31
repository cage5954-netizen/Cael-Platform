import { IntroOverlay } from './IntroOverlay';

interface IntroGateProps {
  onEnter: () => void;
  onEnterStart?: () => void;
}

export function IntroGate({ onEnter, onEnterStart }: IntroGateProps) {
  const handleStart = () => {
    if (onEnterStart) {
      onEnterStart();
    }
  };

  return <IntroOverlay onEnterStart={handleStart} onExitComplete={onEnter} />;
}
