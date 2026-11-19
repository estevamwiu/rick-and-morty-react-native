export const colors = {
  background: '#0f1115',
  card: '#1a1d24',
  border: '#2a2e38',
  text: '#f2f4f8',
  muted: '#8b92a1',
  primary: '#97ce4c',
  alive: '#55cc44',
  dead: '#d63d2e',
  unknown: '#9e9e9e',
};

export const statusColor = (status) => {
  if (status === 'Alive') return colors.alive;
  if (status === 'Dead') return colors.dead;
  return colors.unknown;
};
