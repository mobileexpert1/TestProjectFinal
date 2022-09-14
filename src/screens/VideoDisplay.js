/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {getNotifications} from '../redux/actions/Notifications';
import ScreenLoading from '../component/ScreenLoading';
import VideoPlayer from 'react-native-video-player';
import Video from 'react-native-video';
import moment from 'moment';

function VideoDisplay(props) {
  const isDarkMode = useColorScheme() === 'dark';
  const [isVideoLoaded, setisVideoLoaded] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  let {navigation} = props;
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => {
    getVideoListing();
  }, []);
  useEffect(() => {
    // if (props?.notifications?.response) {
    //   setLoading(true);
    // }
  }, [props?.notifications]);

  function getVideoListing() {
    props.getNotifications();
  }
  const videoBuffer = isBuffer => {
    console.log('isBuffer', isBuffer);
    setLoading(true);
  };
  function renderFlatlist() {
    // console.log('TEST', props?.notifications?.loading);
    if (props?.notifications?.loading) {
      return <ScreenLoading size="small" text="Fetching List of Data" />;
    }

    if (props?.notifications?.response?.length > 0) {
      return (
        <ScrollView
          onMomentumScrollBegin={() => {
            console.log('onMomentumScrollBegin', isPlaying), setIsPlaying(!isPlaying);
          }}
        >
          <View style={{alignItems: 'center', width: '100%'}}>
            <Text style={{fontSize: 17, fontWeight: '700', color: 'black'}}>
              Classes Recordings
            </Text>
            <View
              style={{
                height: 0.2,
                width: '90%',
                borderBottomWidth: 1,
                borderColor: 'grey',
                opacity: 0.3,
                marginTop: 10,
              }}
            />
          </View>
          {props?.notifications?.response.map((video, i) => {
            return (
              <View
                key={i}
                style={{
                  marginVertical: 10,
                }}>
                {loading ? (
                  <View style={styles.playBtnView}>
                    <Text style={{color: 'red'}}>Loading</Text>
                    <ActivityIndicator size={'small'} color={'red'} />
                  </View>
                ) : null}
                <Video
                  muted={false}
                  paused={isPlaying}
                  controls={!loading}
                  style={styles.videoView}
                  source={{
                    uri: video.url,
                  }}
                  onReadyForDisplay={() => {
                    console.log('onReadyForDisplay');
                    setLoading(false);
                  }}
                  onError={err => {
                    console.log(err);
                  }}
                  onLoadStart={() => {
                    console.log('onLoadStart');
                    setLoading(true);
                  }}
                />

                <View style={{alignItems: 'flex-start', marginVertical: 15}}>
                  <Text
                    style={{fontSize: 15, fontWeight: '700', color: 'black'}}>
                    {video.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#8a8b8f',
                      marginTop: 5,
                    }}>
                    {moment(new Date(video.date)).format('DD MMM, YYYY')}
                  </Text>
                  <View style={styles.separaterStyle} />
                </View>
              </View>
            );
          })}
        </ScrollView>
      );
    }
  }

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      {renderFlatlist()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  playBtnView: {
    position: 'absolute',
    zIndex: 100,
    top: 120,
    left: 160,
  },
  playIcon: {
    width: 45,
    height: 45,
    opacity: 0.8,
  },
  separaterStyle: {
    height: 0.2,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'grey',
    opacity: 0.3,
    marginTop: 10,
  },
  videoView: {
    width: 370,
    height: 280,
    borderRadius: 7,
    alignItems: 'center',
    alignContent: 'center',
    overflow: 'hidden',
    borderWidth: 5,
    backgroundColor: 'black',
  },
});

const mapDispatchToProps = {
  getNotifications: params => getNotifications(params),
};

function mapStateToProps(state) {
  const {notifications} = state;
  return {notifications: notifications};
}
export default connect(mapStateToProps, mapDispatchToProps)(VideoDisplay);
