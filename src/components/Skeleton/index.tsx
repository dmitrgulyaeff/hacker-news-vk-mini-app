export default function Skeleton({ style }: { style: React.CSSProperties }) {
  const skeletonStyle = {
    backgroundColor: '#f0f0f0',
    backgroundImage: 'linear-gradient(90deg, #f0f0f0, #e0e0e0, #f0f0f0)',
    backgroundSize: '200% 100%',
    backgroundRepeat: 'no-repeat',
    borderRadius: '4px',
  };

  return <div style={{ ...style, ...skeletonStyle }} />;
}
