/* eslint-disable react-hooks/exhaustive-deps */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { createNewChat, messagePagination, onGroupChatPagination } from '../../../services/chat';
// import {
//   addMessage,
//   changeCurrentGroupChat,
//   resetIsHasNextMessage,
//   useChatState,
// } from './chatSlice';

export const ChatActionKey = {
  CREATE_NEW_CHAT: 'chat/create_new_chat',
  GROUP_CHAT_PAGINATION: 'chat/group_chat_pagination',
  MESSAGE_PAGINATION: 'chat/message_pagination',
  FETCH_MESSAGE_PAGINATION: 'chat/fetch_next_message_pagination',
};
export const createNewChatAsync = createAsyncThunk(ChatActionKey.CREATE_NEW_CHAT, createNewChat);

export const groupChatPaginationAsync = createAsyncThunk(
  ChatActionKey.GROUP_CHAT_PAGINATION,
  onGroupChatPagination
);

export const messagePaginationAsync = createAsyncThunk(
  ChatActionKey.MESSAGE_PAGINATION,
  messagePagination
);

export const fetchNextPageMessagePaginationAsync = createAsyncThunk(
  ChatActionKey.FETCH_MESSAGE_PAGINATION,
  messagePagination
);

export const useChatAction = () => {
  const dispatch = useDispatch();
  // const { currentGroupChat } = useChatState();
  const [pageOfGroupChat, setPageOfGroupChat] = useState(0);
  // const [pageOfMessage, setPageOfMessage] = useState(1);

  const onCreateNewChat = useCallback(async (body) => {
    dispatch(createNewChatAsync(body));
  }, []);

  const onAddMessage = useCallback(async (message) => {
    // dispatch(addMessage(message));
  }, []);

  const onGroupChatPaginationCallBack = useCallback(
    async (name) => {
      dispatch(
        groupChatPaginationAsync({
          where: {
            name: name || '',
          },
          page: pageOfGroupChat,
        })
      );
      setPageOfGroupChat(pageOfGroupChat + 1);
    },
    [pageOfGroupChat]
  );

  //  message pagination
  const onMessagePagination = () => {};
  // const onMessagePagination = useCallback(async () => {
  //   if (!currentGroupChat) return;
  //   setPageOfMessage(1);
  //   dispatch(resetIsHasNextMessage());
  //    dispatch(
  //     messagePaginationAsync({
  //       where: {
  //         groupChatId: currentGroupChat.id,
  //       },
  //       page: 0,
  //     })
  //   );
  // }, [currentGroupChat]);

  const onFetchNextPagePagination = async () => {
    // if (!currentGroupChat) return;
    // dispatch(
    //   fetchNextPageMessagePaginationAsync({
    //     where: {
    //       groupChatId: currentGroupChat.id,
    //     },
    //     page: pageOfMessage,
    //   })
    // );
    // setPageOfMessage(pageOfMessage + 1);
  };

  const onChangeCurrentGroupChat = (groupChat) => {
    // dispatch(changeCurrentGroupChat(groupChat));
  };

  //  init message
  // useEffect(() => {
  //   if (!currentGroupChat) return;
  //   onMessagePagination();
  // }, [currentGroupChat]);

  return {
    onAddMessage,
    onCreateNewChat,
    onChangeCurrentGroupChat,
    onGroupChatPagination: onGroupChatPaginationCallBack,
    onMessagePagination,
    onFetchNextPageGroupChat: onGroupChatPagination,
    onFetchNextPagePagination,
  };
};
