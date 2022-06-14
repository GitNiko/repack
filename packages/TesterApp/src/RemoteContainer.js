import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { ScriptManager } from '@callstack/repack/client';
import { Text } from './Text';

const RemoteChunkId = 'remote';
const Remote = React.lazy(() =>
  import(/* webpackChunkName: "remote" */ './Remote')
);

export const RemoteContainer = () => {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <View>
      {isLoaded ? (
        <React.Suspense fallback={<Text>Loading...</Text>}>
          <Remote />
        </React.Suspense>
      ) : (
        <>
          <Button
            title={isPreloaded ? 'Preloaded' : 'Preload chunk'}
            disabled={isPreloaded}
            onPress={async () => {
              await ScriptManager.preloadScript(RemoteChunkId);
              setIsPreloaded(true);
            }}
          />

          <Button title="Load chunk" onPress={() => setIsLoaded(true)} />
        </>
      )}
      <Button
        title={'Invalidate'}
        onPress={async () => {
          await ScriptManager.invalidateScripts([RemoteChunkId]);
          setIsPreloaded(false);
        }}
      />
    </View>
  );
};
