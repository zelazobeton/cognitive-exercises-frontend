import {MemoryTileDto} from '../memory-tile/memory-tile-dto';

export interface MemoryBoardDto {
  memoryTiles: MemoryTileDto[];
  numOfUncoveredTiles: number;
}

export interface TileClick {
  memoryId: number;
  tileId: number;
}