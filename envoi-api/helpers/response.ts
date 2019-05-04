/**
 * 
 * @param entity 
 */
export function deleteSuccess(entity: any) {
  return {
    id: entity.id
  };
}