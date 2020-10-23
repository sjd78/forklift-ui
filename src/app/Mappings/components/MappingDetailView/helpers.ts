import { isSameResource } from '@app/queries/helpers';
import {
  INetworkMappingItem,
  IOpenShiftProvider,
  IProvidersByType,
  IStorageMappingItem,
  IVMwareProvider,
  Mapping,
  MappingItem,
  MappingType,
  POD_NETWORK,
} from '@app/queries/types';
import { QueryResult } from 'react-query';

export const getMappingTargetName = (item: MappingItem, mappingType: MappingType): string => {
  if (mappingType === MappingType.Network) {
    const networkItem = item as INetworkMappingItem;
    if (networkItem.destination.type === 'pod') return POD_NETWORK.name;
    return networkItem.destination.name;
  }
  return (item as IStorageMappingItem).destination.storageClass;
};

export const groupMappingItemsByTarget = (
  mappingItems: MappingItem[],
  mappingType: MappingType
): MappingItem[][] => {
  const targetNames: string[] = Array.from(
    new Set(mappingItems.map((item) => getMappingTargetName(item, mappingType)))
  );
  return targetNames.map((targetName) =>
    mappingItems.filter((item) => getMappingTargetName(item, mappingType) === targetName)
  );
};
