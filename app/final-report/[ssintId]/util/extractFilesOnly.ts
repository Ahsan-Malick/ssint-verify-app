

type Side = 'front' | 'back';
type DamageCategory = 'corner' | 'edges' | 'surface';
type DamageType = 'minor' | 'major' | 'majorPlus';

import { DamageImages } from "../page";

type DamageImagesFileOnly = Record<
  Side,
  Record<DamageCategory, Record<DamageType, File[]>>
>;


 const extractFilesOnly = (damageImages: DamageImages) => {
  const sides: Side[] = ['front', 'back'];
  const categories: DamageCategory[] = ['corner', 'edges', 'surface'];
  const types: DamageType[] = ['minor', 'major', 'majorPlus'];

  const result: DamageImagesFileOnly = {
    front: {
      corner: { minor: [], major: [], majorPlus: [] },
      edges: { minor: [], major: [], majorPlus: [] },
      surface: { minor: [], major: [], majorPlus: [] },
    },
    back: {
      corner: { minor: [], major: [], majorPlus: [] },
      edges: { minor: [], major: [], majorPlus: [] },
      surface: { minor: [], major: [], majorPlus: [] },
    },
  };

  for (const side of sides) {
    for (const category of categories) {
      for (const type of types) {
        result[side][category][type] = damageImages[side][category][type].file as File[];
      }
    }
  }


  return result;
};

export default extractFilesOnly;