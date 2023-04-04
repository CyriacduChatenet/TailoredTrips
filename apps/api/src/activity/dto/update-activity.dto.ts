import { TimeSlot } from '../../user/traveler/travel/day/time-slot/entities/time-slot.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Advertiser } from '../../user/advertiser/entities/advertiser.entity';
import { ActivityDetail } from '../activity-detail/entities/activity-detail.entity';
import { ActivityImage } from '../activity-image/entities/activity-image.entity';
import { ActivityTag } from '../activity-tag/entities/activity-tag.entity';

export class UpdateActivityDto {
  name?: string
  mark?: number
  detail?: ActivityDetail
  image?: ActivityImage
  location?: string;
  source?: string;
  comments?: Comment[];
  advertiser?: Advertiser;
  tags?: ActivityTag[];
  timeSlots?: TimeSlot[];
}
