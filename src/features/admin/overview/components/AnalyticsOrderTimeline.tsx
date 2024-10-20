import { timelineItemClasses } from '@mui/lab';
import Timeline from '@mui/lab/Timeline';
import type { CardProps } from '@mui/material/Card';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import OrderTimelineItem from './TimelineItem'; // Import the Item component

// Define the type for the order timeline props
type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: {
    id: string;
    type: string;
    title: string;
    time: string | number | null;
  }[];
};

// AnalyticsOrderTimeline component that renders the entire timeline
const AnalyticsOrderTimeline = ({ title, subheader, list, ...other }: Props) => {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Timeline
        sx={{
          m: 0,
          p: 3,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {list.map((item, index) => (
          <OrderTimelineItem key={item.id} item={item} lastItem={index === list.length - 1} />
        ))}
      </Timeline>
    </Card>
  );
};

export default AnalyticsOrderTimeline;
