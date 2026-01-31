import { IntroOverlay } from './IntroOverlay';

type IntroGateProps = {
  onEnter: () => void;
};

/**
 * Deprecated: kept only for backwards compatibility.
 * Use IntroOverlay as the single intro gate.
 */
export function IntroGate({ onEnter }: IntroGateProps) {
  return (
    <IntroOverlay
      onEnterStart={() => {
        // IntroOverlay handles audio start via App.
        // This prop exists to keep legacy signature stable.
      }}
      onExitComplete={onEnter}
    />
  );
}
