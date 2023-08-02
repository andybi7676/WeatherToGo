import { StyleSheet, FlatList } from 'react-native'
import React, { useState, useRef, useCallback } from 'react'

import MapCard from './MapCard'
import tw from 'twrnc'

const defaultIndex = 0;

export default function MapCardList({ data, curIdx, changeCurIdx }) {
  const [ index, setIndex ] = useState(curIdx);
  const flatListRef = useRef();
  const viewConfigRef = useRef({
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 50,
  });

  const onViewCallBack = useCallback(({_, viewableItems}) => {
    if (viewableItems.length > 0) {
      console.log(`Set index to ${viewableItems[0].index}`);
      setIndex(viewableItems[0].index);
    }
  }, []);

  const finishScrolling = () => {
    flatListRef.current.scrollToIndex({ animated: true, index: index, viewPosition: 0.5, });
    changeCurIdx(index);
    // mapRef.current.animateToRegion(tmpData[index].region);
  };

  return (
    <FlatList
      style={[tw`bg-gray-300/50`]}
      contentContainerStyle={tw`px-4 bg-yellow-100/1`}
      horizontal={true}
      data={data}
      renderItem={({item}) => <MapCard item={item} pressed={finishScrolling} />}
      initialScrollIndex={defaultIndex}
      ref={flatListRef}
      keyExtractor={item => item.id}
      viewabilityConfig={viewConfigRef.current}
      onViewableItemsChanged={onViewCallBack}
      onMomentumScrollEnd={() => finishScrolling()}
    />
  )
}

const styles = StyleSheet.create({})